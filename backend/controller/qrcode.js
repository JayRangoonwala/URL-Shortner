import QRCode from 'qrcode';
// import express from 'express';

// const app = express();

export const GenerateQRCode = async(req, res) => {
    const url = req.body.url;
    // console.log(url)
    try{
        const qrCode = await QRCode.toDataURL(url);

        const base64Data = qrCode.replace(/^data:image\/png;base64,/, '');  
        const imgBuffer = Buffer.from(base64Data, 'base64');

    // res.writeHead(200, {
    //   'Content-Type': 'image/png',
    //   'Content-Length': imgBuffer.length
    // });
    return res.status(200).json({img:imgBuffer})
    // res.send(`<html><body><img src="${qrCode}" alt="QR Code"></body></html>`);
    }
    catch(error){
        console.log('Error generating QR code',error);
    }
}


