import { formatCategoryTitle } from "@/lib/utils"
// En lugar de importar de component-a

export default function ComponentB() {
  const title = formatCategoryTitle("example")
  return <div>{title}</div>
}

