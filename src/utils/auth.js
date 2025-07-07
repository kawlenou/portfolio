export const verifyToken = (token) => {
  if (!token) return false
  
  try {
    // 1. Vérification basique du format
    const parts = token.split('.')
    if (parts.length !== 3) return false

    // 2. Vérification de l'expiration (si JWT)
    const payload = JSON.parse(atob(parts[1]))
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false
    }

    return true
  } catch (error) {
    console.error('Erreur de vérification du token:', error)
    return false
  }
}
