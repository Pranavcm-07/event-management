'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import Dropdown from '@/components/shared/Dropdown'
import { FileUploader } from '@/components/shared/FileUploader'
import Image from "next/image"
import { useUploadThing } from "@/lib/uploadthing";
import { authLoginSchema, authRegisterSchema } from '@/lib/validator'
import { loginDefaultValues, registerDefaultValues } from '@/constants'


const Auth = () => {
    const [mode,setMode] = useState<string>('register')
    const isLogin = mode === 'login';
    const isRegister = mode === 'register';
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('imageUploader')
    const zodSchema = isLogin ? authLoginSchema : authRegisterSchema
    const initialValues = isLogin ? loginDefaultValues : registerDefaultValues
    const form = useForm<z.infer<typeof zodSchema>>({
        resolver: zodResolver(zodSchema),
        defaultValues: initialValues,
      })
      async function onSubmit(values: z.infer<typeof zodSchema>) {
        const eventData = values
        
        let uploadedImageUrl
        if (isRegister && 'imageUrl' in eventData) {
            uploadedImageUrl = eventData.imageUrl
        }
        if (files.length > 0) {
          const uploadedImages=await startUpload(files)
          if (!uploadedImages) return
          uploadedImageUrl = uploadedImages[0].url
        }
        if (isRegister){
            try {
                const response = await userRegister({
                    ...eventData,
                    imageUrl: uploadedImageUrl
                })
                if (response) {
                    form.reset()
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const response = await userLogin({
                    ...eventData,
                })
                if (response) {
                    form.reset()
                }
            } catch (error) {
                console.log(error)
            }
        }
    
      }
  return (
    <div className="wrapper flex-center min-h-screen">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
            {isRegister && (
                <>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="firstname"    
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Firstname" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Lastname" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Email" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Password" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Confirm Password" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                <FileUploader
                                    onFieldChange={field.onChange}
                                    imageUrl={field.value}
                                    setFiles={setFiles} 
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        /> 
                    </div>
                </>)}
            {isLogin && (
                <>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Email" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Password" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </>
            )}
            <Button 
                type="submit"
                size='lg'
                disabled={form.formState.isSubmitting}
                className="w-full button col-span-2"
            >
                    {form.formState.isSubmitting ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
            </Button>
        </form>
        </Form>
    </div>
  )
}

export default Auth