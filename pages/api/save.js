import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import { fromBase64 } from '../../utils/base64'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmssSSS'))
    .toString(16)
    .toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY),
    })
    await doc.loadInfo()
    console.log(doc.title)
    const sheet = doc.sheetsByIndex[1]
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A4:B4')
    const mostrarPromocaoCell = sheetConfig.getCellByA1('A4')
    const textoCell = sheetConfig.getCellByA1('B4')

    let Cupom = ''
    let Promo = ''
    console.log('teste do mostrar ' + mostrarPromocaoCell.value)
    if (mostrarPromocaoCell.value === 'VERDADEIRO') {
      Cupom = genCupom()
      Promo = textoCell.value
    }

    //Nome	Email	Whatsapp	Cupom	Promo
    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Cupom,
      Promo,
      'Data Preenchimento': moment().format('MM/DD/YYYY  HH:mm:ss'),
      Nota: parseInt(data.Nota),
    })
    console.log(JSON.parse(req.body))
    res.end(
      JSON.stringify({
        showCoupon: Cupom !== '',
        Cupom,
        Promo,
      }),
    )
  } catch (err) {
    console.log(err)
    res.end('error')
  }
}
