import { GoogleSpreadsheet } from 'google-spreadsheet'
import { fromBase64 } from '../../utils/base64'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)
export default async (req, res) => {
  try {
    // await doc.useServiceAccountAuth(credentials)
    //console.log(process.env.SHEET_CLIENT_EMAIL)
    //console.log(process.env.SHEET_PRIVATE_KEY)
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY),
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A4:B4')
    const mostrarPromocaoCell = sheet.getCellByA1('A4')
    const textoCell = sheet.getCellByA1('B4')

    res.end(
      JSON.stringify({
        showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
        couponMessage: textoCell.value,
      }),
    )
  } catch (err) {
    console.log(err)
    res.end(
      JSON.stringify({
        showCoupon: false,
        couponMessage: '',
      }),
    )
  }
}
