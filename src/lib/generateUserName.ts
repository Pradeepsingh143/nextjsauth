function generateUsername(name: string | null | undefined, email: string | null | undefined): string {
    if (!name && !email) {
      throw new Error('Either name or email must be provided.');
    }
    
    const base = name || (email ? email.split("@")[0] : '');
    const randomSuffix = Math.floor(Math.random() * 10000);
    
    return `${base.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}${randomSuffix}`;
  }
  
  export default generateUsername;