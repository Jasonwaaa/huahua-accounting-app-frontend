import { FC } from "react";

const OpreationBar : FC = () => (
  <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
    <h2 className="text-lg font-semibold">Operation Bar</h2>
    <div className="flex space-x-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Create Item</button>
      <button className="px-4 py-2 bg-green-500 text-white rounded">Action 2</button>
    </div>
  </div>
);

export default OpreationBar;