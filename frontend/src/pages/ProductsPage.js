import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Filter, 
  Search, 
  MoreVertical,
  X,
  Upload
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Product Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-gray-100 text-gray-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Expired': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// Product Action Dropdown
const ProductActionDropdown = ({ product, onEdit, onDelete, onChangeStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      icon: Edit2, 
      label: 'Edit Product', 
      onClick: () => onEdit(product) 
    },
    { 
      icon: product.status === 'Active' ? EyeOff : Eye, 
      label: product.status === 'Active' ? 'Deactivate' : 'Activate', 
      onClick: () => onChangeStatus(product, product.status === 'Active' ? 'Inactive' : 'Active') 
    },
    { 
      icon: Trash2, 
      label: 'Delete Product', 
      onClick: () => onDelete(product) 
    }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray-100 rounded-full p-2"
      >
        <MoreVertical size={20} className="text-gray-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 w-48 bg-white shadow-lg rounded-lg border">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <action.icon className="mr-3 text-gray-500" size={16} />
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Add Product Modal Component
const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const categories = [
    'Vintage Clothing', 
    'Collectibles', 
    'Music', 
    'Electronics', 
    'Art', 
    'Jewelry', 
    'Antiques'
  ];

  const handleImageUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const validImageFiles = newFiles.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 
    );
    setImages(prevImages => [...prevImages, ...validImageFiles]);
  };

  const removeImage = (indexToRemove) => {
    setImages(prevImages => 
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !startingPrice || !category) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      description,
      startingPrice: `$${startingPrice}`,
      currentBid: `$${startingPrice}`,
      status: 'Active',
      category,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      images: images.map(file => URL.createObjectURL(file))
    };

    onAddProduct(newProduct);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartingPrice('');
    setCategory('');
    setImages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Starting Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input 
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="Enter starting price"
                min="0"
                step="0.01"
                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product Images
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                type="file" 
                multiple 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex justify-center mb-4">
                <Upload className="text-gray-400" size={48} />
              </div>
              <p className="text-gray-500">
                Drag and drop images or <span className="text-blue-600 cursor-pointer">browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Maximum 5 images, each up to 5MB
              </p>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Upload ${index + 1}`} 
                      className="w-full h-20 object-cover rounded"
                    />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400 mr-4"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Product List Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    // Fetch products from API or database here
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (product) => {
    console.log('Edit product', product);
    // Add edit functionality here
  };

  const handleDeleteProduct = (product) => {
    setProducts(products.filter(p => p.id !== product.id));
  };

  const handleChangeStatus = (product, status) => {
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, status } : p
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
        <button 
          onClick={() => setIsAddProductModalOpen(true)} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product.title}
                </td>
                <td className="px-4 py-2 text-sm">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-2 text-sm">
                  <ProductActionDropdown 
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onChangeStatus={handleChangeStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddProductModal 
        isOpen={isAddProductModalOpen} 
        onClose={() => setIsAddProductModalOpen(false)} 
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default ProductList;