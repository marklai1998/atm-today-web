export const formatParams = (params: Record<string, string | undefined>) => {
  const items = Object.entries(params).filter(([_, v]) => v)
  if (items.length === 0) return ''
  return (
    '?' +
    items
      .map(([key, value]) => {
        if (!value) return ''
        return key + '=' + encodeURIComponent(value)
      })
      .filter(v => v)
      .join('&')
  )
}
