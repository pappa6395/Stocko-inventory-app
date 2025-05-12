
export function generateResetToken30minsExpiry(count: number | null, expireDate: Date | null) {
    return (count ?? 0) === 0 
        ? new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
        : expireDate // Keep existing expiration if already set
}