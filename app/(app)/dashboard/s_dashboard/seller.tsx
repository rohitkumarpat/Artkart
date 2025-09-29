"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Palette, Brush, DollarSign, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { CldImage } from 'next-cloudinary';

export default function ArtKartSellerPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadImage, setUploadImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price:"",
    discount: "",
    imageUrl: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      [field]: field === "price" || field === "discount" ? parseInt(value) || 0 : value,
    }))
  }

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Optional: Handle drag-and-drop file upload
  }


  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      const imageUrl = data.publicid
      setUploadImage(imageUrl)
      setProductData((prev) => ({ ...prev, imageUrl: imageUrl }))
       alert("Successfully upload the product")
    } catch (error) {
      console.error(error)
      alert("Failed to upload the image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      await axios.post("/api/product", productData)
      alert("Product submitted successfully")
      router.push("/dashboard/s_dashboard/viewproduct") 
    } catch (error) {
      console.error(error)
      alert("Failed to submit product")
    }
  }

  // Price calculations
  const price = Number(productData.price)
  const discount = Number(productData.discount)
  const discountedPrice = price * (1 - discount / 100)

  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 animate-slide-in-left text-balance">
            Welcome to{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text">
              ArtKart
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground animate-fade-in-up animate-delay-400 text-balance">
            as a <span className="text-accent font-bold">Seller</span>
          </p>
          <div className="mt-8 animate-fade-in-up animate-delay-600">
            <div className="inline-block px-6 py-3 bg-card border border-border rounded-full">
              <p className="text-lg text-card-foreground">Join thousands of artists worldwide</p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16 animate-fade-in-up text-balance">
            What do you want to sell?
          </h2>

          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-card border-border animate-fade-in-up animate-delay-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
                  <Palette className="w-6 h-6 text-primary" />
                  Product Details
                </CardTitle>
                <CardDescription>Fill in the details of your artwork to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-card-foreground flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter your artwork title"
                      value={productData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium text-card-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Price ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={productData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Brush className="w-4 h-4 text-primary" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your artwork, techniques used, inspiration, etc."
                    value={productData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-background border-border focus:border-primary min-h-[120px] resize-none"
                  />
                </div>

                {/* Discount */}
                <div className="space-y-2">
                  <Label htmlFor="discount" className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Badge className="w-4 h-4 text-primary" />
                    Discount (%)
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="100"
                    value={productData.discount}
                    onChange={(e) => handleInputChange("discount", e.target.value)}
                    className="bg-background border-border focus:border-primary max-w-xs"
                  />
                </div>

                {/* Preview */}
                {(productData.title || price > 0 || uploadImage) && (
                  <div className="mt-8 p-4 bg-background rounded-lg border border-border">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Preview:</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-card-foreground">
                          {productData.title || "Your Artwork Title"}
                        </h5>
                        {productData.description && (
                          <p className="text-sm text-muted-foreground mt-1 text-pretty">
                            {productData.description.slice(0, 100)}
                            {productData.description.length > 100 ? "..." : ""}
                          </p>
                        )}
                        {uploadImage && (
                          <CldImage 
                           src={uploadImage} alt="Preview" className="mt-4 max-h-48 rounded" 
                             width="400"
                             height="800" 
                           />
                        )}

                      </div>
                      <div className="text-right">
                        {price > 0 && (
                          <div className="flex items-center gap-2">
                            {discount > 0 ? (
                              <>
                                <Badge variant="destructive" className="bg-accent text-accent-foreground">
                                  -{discount}%
                                </Badge>
                                <span className="text-lg font-bold text-primary">${discountedPrice.toFixed(2)}</span>
                                <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upload Section */}
          <div className="max-w-2xl mx-auto animate-fade-in-up animate-delay-1000">
            <input type="file"  accept="image/*" ref={fileInputRef} className="hidden" onChange={handleUpload} />
            <Card
              className="bg-card border-2 border-dashed border-border hover:border-primary transition-colors duration-300 cursor-pointer"
              onClick={triggerFileSelect}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <CardContent className="p-12 text-center">
                <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-card-foreground mb-2">Ready to start selling?</h3>
                <p className="text-muted-foreground text-pretty mb-4">
                  Upload your artwork and join our community of talented artists
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold">
                  <Upload className="w-5 h-5 mr-2" />
                  {isUploading ? "Uploading..." : "Upload Your Art"}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">Drag and drop files here or click to browse</p>
              </CardContent>
            </Card>
          </div>

          {/* Submit */}
          <div className="max-w-2xl mx-auto mt-12 animate-fade-in-up animate-delay-1200 text-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleSubmit}
            >
              <Palette className="w-6 h-6 mr-3" />
              Sell to ArtKart
            </Button>
            <p className="text-sm text-muted-foreground mt-4 text-pretty">
              Complete your listing and start earning from your art today
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
