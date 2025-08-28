export const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n))

export const formatDateForDisplay = (d: Date): string => {
  const y = d.getFullYear()
  const m = pad2(d.getMonth() + 1)
  const day = pad2(d.getDate())
  const hh = pad2(d.getHours())
  const mm = pad2(d.getMinutes())
  return `${y}-${m}-${day} ${hh}:${mm}`
}

export const toStorageDateString = (d: Date): string => {
  // 저장용: 화면 정렬/파싱 용이하게 공백 구분 포맷 유지
  return formatDateForDisplay(d)
}
