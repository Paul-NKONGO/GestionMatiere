const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const translate = require('@vitalets/google-translate-api');
const numberToWords = require('number-to-words');

// Fonction utilitaire pour formater les nombres avec des espaces insécables
const formatNumberForPDF = (number) => {
    return number.toLocaleString('fr-FR').replace(/\s/g, '\u00A0');
};

// Fonction pour générer le bon de commande
module.exports.generatePurchaseOrder = async (delivery, provider, materials) => {
    // Créer un nouveau document PDF avec marges personnalisées
    const doc = new PDFDocument({
        margins: { top: 10, left: 40, bottom: 1, right: 40 }  // Marges réduites
    });

    // Définir le chemin où enregistrer le PDF
    const filePath = path.join(__dirname, `Bon_Commande_${delivery.orderNumber}.pdf`);
    const stream = fs.createWriteStream(filePath);

    // Pipe pour écrire dans le fichier
    doc.pipe(stream);

    // En-tête
    const headerImagePath = path.join(__dirname, 'images', 'entete_bc.png'); // Assurez-vous que l'image est dans ce répertoire
    doc.image(headerImagePath, { fit: [900, 210], align: 'left' }); // Ajuster la taille de l'image selon besoin
    doc.moveDown(14);

    // Date et lieu
    const today = new Date().toLocaleDateString('fr-FR');
    const today1 = new Date();
    const year = today1.getFullYear();
    doc.text(`Yaoundé, le ${today}`, { align: 'right' });
    doc.moveDown(1);

    // Informations sur la livraison
    doc.font('Helvetica-Bold').fontSize(12).text(`BON DE COMMANDE ADMINISTRATIF BCA ${delivery.orderNumber}`, { align: 'center', underline: true });
    doc.font('Helvetica');  // Retour à la police normale après
    doc.moveDown(0.5);
    doc.text(`IMPUTATION BUDGETAIRE : BUDGET DE L'ANTIC; EXERCICE      `, { align: 'center', continued: true });  // Partie normale
    doc.font('Helvetica-Bold').text(`${year}`, { align: 'center' });  // Partie en gras
    doc.font('Helvetica');  // Retour à la police normale après
    doc.text(`LIGNE BUDGETAIRE                             `, { align: 'center', continued: true });
    doc.font('Helvetica-Bold').text(`${delivery.budgetLine}                           `, { align: 'center' });
    doc.font('Helvetica'); 
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(12).text(`${delivery.acquisitionType}`, { align: 'center', underline: true });
    doc.font('Helvetica');
    doc.moveDown(0.5);
    doc.text(`Noms ou Raison du prestataire : `, { continued: true });
    doc.font('Helvetica-Bold').text(provider.name);
    doc.font('Helvetica');
    doc.moveDown(0.2);
    doc.text(`BP : ${provider.postalBox}`, { align: 'left' });
    doc.moveDown(0.2);
    doc.text(`Tél : ${provider.phone}`, { align: 'left' });
    doc.moveDown(0.2);
    doc.text(`N° Contribuable: ${provider.taxNumber}`, { align: 'left' });
    doc.moveDown(0.2);
    doc.text(`Pour la prestation ci-après`, { align: 'left' });
    doc.moveDown(0.5);

    // Table des matériaux
    doc.text(`Référence mercuriale                 Désignation                          Qté       P.U             P.T       `, { underline: true });

    // Fonction pour formater le texte avec des espaces
    const formatText = (reference, name, quantity, unitPrice, totalPrice) => {
    // Ajustez les espacements en fonction de la longueur des colonnes
    const referenceWidth = 30;
    const nameWidth = 42;
    const quantityWidth = 5;
    const unitPriceWidth = 10;
    const totalPriceWidth = 10;

    // Utiliser la fonction pour formater les nombres
    const formattedQuantity = formatNumberForPDF(quantity);
    const formattedUnitPrice = formatNumberForPDF(unitPrice);
    const formattedTotalPrice = formatNumberForPDF(totalPrice);

    return `${reference.padEnd(referenceWidth)} ${name.padEnd(nameWidth)} ${String(formattedQuantity).padStart(quantityWidth)} ${String(formattedUnitPrice).padStart(unitPriceWidth)} ${String(formattedTotalPrice).padStart(totalPriceWidth)}`;
};

// Ajout des matériaux
materials.forEach((material, index) => {
    const totalPrice = material.quantity * material.unitPrice;
    doc.text(`${index + 1}. ${formatText(material.mercurialReference, material.name, material.quantity, material.unitPrice, totalPrice)}`);
});

    // Montants
    const totalHT = materials.reduce((sum, material) => sum + (material.quantity * material.unitPrice), 0);
    const tva = totalHT * 0.1925;
    const ir = totalHT * 0.055;
    const totalTTC = totalHT + tva;
    const NAP = totalHT - ir;

    doc.moveDown(0.5);
    doc.text(`Montant HT`, { align: 'left', continued: true });
    doc.text(formatNumberForPDF(Math.trunc(totalHT)), { align: 'right' });
    doc.moveDown(0.2);

    doc.text(`TVA (19,25%)`, { align: 'left', continued: true });
    doc.text(formatNumberForPDF(Math.trunc(tva)), { align: 'right' });
    doc.moveDown(0.2);

    doc.text(`IR (5,5%)`, { align: 'left', continued: true });
    doc.text(formatNumberForPDF(Math.trunc(ir)), { align: 'right' });
    doc.moveDown(0.2);

    doc.text(`TOTAL TTC`, { align: 'left', continued: true });
    doc.font('Helvetica-Bold').text(formatNumberForPDF(Math.trunc(totalTTC)), { align: 'right' });
    doc.font('Helvetica');
    doc.moveDown(0.2);

    doc.text(`NAP`, { align: 'left', continued: true });
    doc.text(formatNumberForPDF(Math.trunc(NAP)), { align: 'right' });
    doc.moveDown(1);

    // Total TTC en lettres
    let totalTTCInWords = numberToWords.toWords(totalTTC).toLowerCase();
    totalTTCInWords = totalTTCInWords.charAt(0).toUpperCase() + totalTTCInWords.slice(1);

    //Conversion en francais
    try {
        const translation = await translate(totalTTCInWords, { from: 'en', to: 'fr' });
        const totalTTCInWordsFr = translation.text.toUpperCase();

        // Afficher le montant traduit dans le PDF
        doc.font('Helvetica-Bold').text(`Les parties arrêtent le présent bon de commande (TTC) à : ${totalTTCInWordsFr} francs CFA./`, { align: 'left' });

    } catch (error) {
        console.error('Erreur lors de la traduction:', error);
        doc.font('Helvetica-Bold').text(`Les parties arrêtent le présent bon de commande (TTC) à : ${totalTTCInWords} francs CFA./`, { align: 'left' });
    }
    
    doc.moveDown(1.5);
    doc.text(`Le Prestataire`, { align: 'left', continued: true });
    doc.text(`L'ordonnateur`, { align: 'right' });
    doc.font('Helvetica');

    // Calculer la position en fonction de la hauteur de la page
    const pageHeight = doc.page.height;
    const distanceFromBottom = 20; // Distance désirée depuis la marge inférieure
    const textPositionY = pageHeight - distanceFromBottom;

    // Dessiner un trait horizontal sur toute la largeur du document
    const startX = doc.page.margins.left;  // Position de départ (marge gauche)
    const endX = doc.page.width - doc.page.margins.right;  // Position de fin (largeur de la page moins la marge droite)
    const y = doc.y;  // Utilise la position verticale actuelle (vous pouvez spécifier une position précise si nécessaire)

    // Dessiner le trait horizontal
    doc.moveTo(startX, textPositionY - 3)  // Position de départ
    .lineTo(endX, textPositionY - 3)    // Position de fin
    .stroke();          // Dessiner la ligne

    // Placer le texte à la position calculée
    doc.fontSize(8)
        .text(`B.P. 6170 Yaoundé`, 40, textPositionY, { align: 'left', continued: true })
        .text(`Tel. 222 203 930                           Web: www.antic.cm                                 `, { align: 'center', continued: true })
        .text(`Email : infos@antic.cm`, { align: 'right' });

    // Fin du document
    doc.end();

    // Retourner le chemin du fichier généré
    return filePath;
};
