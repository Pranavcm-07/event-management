import { z } from "zod"


export const eventFormSchema = z.object({
    title: z.string().min(3,"Title must be at least 3 characters long").max(400,"Title must be at most 400 characters long"),
    description: z.string().min(3,"Description must be at least 3 characters long").max(400,"Description must be at most 400 characters long"),
    location: z.string().min(3,"Location must be at least 3 characters long").max(400,"Location must be at most 400 characters long"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price :z.string(),
    isFree : z.boolean(),
    url: z.string().url(),
  })

  export const authRegisterSchema = z.object({
    firstname: z.string()
      .min(3, "First name must be at least 3 characters long")
      .max(30, "First name must be at most 30 characters long"),
    lastname: z.string()
      .min(3, "Last name must be at least 3 characters long")
      .max(30, "Last name must be at most 30 characters long"),
    email: z.string().email(),
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must be at most 30 characters long"),
    confirmPassword: z.string(),
    imageUrl: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set the path to the error field
  });
  export const authLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
      .min(6, "Password must be at least 6 characters long")
      .max(30, "Password must be at most 30 characters long"),
  })