import { Category } from "../../types"

type Props = {
    filterType: string,
    handleFilter : (filterData:string, filterType: string) => void,
    categories?: Category[],
    cities?: string[]
}

export const ProductFilter = ( {handleFilter, categories, filterType} : Props) => {

    
  return (
    <select className="post-filter w-full max-h-6 my-4 " onChange={e => handleFilter(e.target.value, filterType)}>
            <option value="All">All</option>
            {categories?.map(category => {
                return <option value={category.name}>{category.name}</option>
            })}
    </select>
  )
}