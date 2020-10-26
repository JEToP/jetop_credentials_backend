import forge from "node-forge";

export class Encryption {

  privateKey: string = "VeeRySeCrEtKeY1234567890";

  private getKey() {
    // privateKey pulling logic goes here.
    return this.privateKey;
  }


  /**
   * Encrypt by 3DES using node-forge
   * @param pwd utf8 string
   * @returns {String} Output is a base64 string
   */
  public encrypt(pwd: string): string {
    let cipher = forge.cipher.createCipher('3DES-ECB', this.getKey().substring(0, 24));
    cipher.start();
    cipher.update(forge.util.createBuffer(Buffer.from(pwd, "utf8").toString("binary")));
    cipher.finish();
    var encrypted = cipher.output;
    return Buffer.from(encrypted.getBytes(), "binary").toString("base64")
  }

  /**
  * Decrypt by 3DES using node-forge
  * @param input A base64 string
  * @returns {String} A utf8 string
  */
  public decrypt(hash: string): string {
    const decipher = forge.cipher.createDecipher('3DES-ECB', this.getKey().substring(0, 24));
    decipher.start();

    const inputEx = forge.util.createBuffer(Buffer.from(hash, "base64").toString("binary"));
    decipher.update(inputEx);
    decipher.finish();
    const decrypted = decipher.output;
    return Buffer.from(decrypted.getBytes(), "binary").toString("utf8")
  }
}
