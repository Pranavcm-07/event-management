'use client'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { fetchCategory } from '@/lib/actions/category.actions'
import { ICategory } from '@/lib/database/models/category.model'
  

const Category = () => {
    const router = useRouter()
  const searchParams = useSearchParams()
  const [categories,setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await fetchCategory();

      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])

  const onSelectCategory = (category:string)=>{
    let modifiedUrl = '';
      if (category && category!=="All") {
        modifiedUrl = formUrlQuery({
          params: searchParams!.toString(),
          key:  'category',
          value:category
        })
      }else{
        modifiedUrl = removeKeysFromQuery({
          params: searchParams!.toString(),
          keysToRemove: ['category']
        })
      }
      router.push(modifiedUrl,{scroll:false})
  }
  return (
    <Select onValueChange={(value:string)=>onSelectCategory(value)}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All" className='select-item p-regular-14'>All</SelectItem>
            {categories.map((category)=>(
                <SelectItem value={category.name} key={category._id} className='select-item p-regular-14'>
                    {category.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default Category