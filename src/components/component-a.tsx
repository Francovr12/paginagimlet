import { formatCategoryTitle } from "@/lib/utils"
// En lugar de importar de component-b

export default function ComponentA() {
  const title = formatCategoryTitle("example")
  return <div>{title}</div>
}

