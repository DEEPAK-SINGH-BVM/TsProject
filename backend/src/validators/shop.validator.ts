import { z } from "zod";
export const shopSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(3, "Description is required"),
  category: z.string().min(3, "Category is required"),
  phone: z.string().min(10, "Phone is required"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(3, "City is required"),
  state: z.string().min(3, "State is required"),
});
