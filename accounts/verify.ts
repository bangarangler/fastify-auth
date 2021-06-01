import crypto from 'crypto'
const {ROOT_DOMAIN, JWTSignature} from '../constants'

export async function createVerifyEmailToken(email: string) {
  try{
    const emailToken = await createVerifyEmailToken(email)
    const URIencodedEmail = encodeURIComponent(email)
    return `https://${ROOT_DOMAIN}/verify/${URIencodedEmail}/${emailToken}`
  } catch(e)
  console.error(e)
}
