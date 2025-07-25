'use client'
import { FC, useState } from "react";
import Modal from "@/_components/Modal";
import Button from "@/_components/Button";

const OpreationBar : FC = () => {
    const [IsCreateItemOpen,SetIsCreateItemOpen] = useState(false);

return(
  <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
    <h2 className="text-lg font-semibold">Operation Bar</h2>
    <div className="flex space-x-4">
      <Button  onClick={()=>SetIsCreateItemOpen(true)}>Create Item</Button>
        {IsCreateItemOpen &&   (<Modal title="Create New Item" onClose={()=>SetIsCreateItemOpen(false)}>
            <div className="p-4 text-black">
            <h3 className="text-lg font-semibold mb-4 text-black">Create New Item</h3>
            <form>
                <input type="text" placeholder="Item Name" className="border p-2 w-full mb-4" />
                <input type="number" placeholder="Quantity" className="border p-2 w-full mb-4" />
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
            </form>
            </div>
        </Modal>)}
      <button className="px-4 py-2 bg-green-500 text-white rounded">Action 2</button>
    </div>
  </div>
);}

export default OpreationBar;