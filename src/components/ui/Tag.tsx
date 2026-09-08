interface TagProps {
  label: string
  bg: string
  text: string
}

export function Tag({ label, bg, text }: TagProps) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: bg, color: text }}
    >
      {label}
    </span>
  )
}
