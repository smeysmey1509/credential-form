import React from "react";
import Logo from '../../assets/react.svg'
import {CiEdit} from "react-icons/ci";
import {RiDeleteBinLine} from "react-icons/ri";

const products = [
    {
        id: 1,
        product: "Product A",
        category: "Electronics",
        price: 15,
        stock: 244,
        status: 'Published',
        seller: 'Mouyleang',
        published: '24,Nov 2023 - 04:42PM',
        action: 'delete'
    },
    {
        id: 1,
        product: "Product A",
        category: "Electronics",
        price: 15,
        stock: 244,
        status: 'Unpublished',
        seller: 'Mouyleang',
        published: Date.now(),
        action: 'delete'
    },
    {
        id: 1,
        product: "Product A",
        category: "Electronics",
        price: 15,
        stock: 244,
        status: 'padding',
        seller: 'Mouyleang',
        published: Date.now(),
        action: 'delete'
    },
];

const Product = () => {
    return (
        <div className={'w-full h-full'}>
            <table
                className='table-auto w-[100%] text-[0.85rem] font-normal text-left border-collapse'>
                <thead className='text-sm'>
                <tr className="border-b dark:border-gray-700 border-gray-200">
                    <th scope="col" className='w-10 h-full py-2 text-center'><input type="checkbox" value=""
                                                                                    className='border border-[#dee7f1] bg-[#fff] dark:bg-gray-600 dark:border-gray-500'/>
                    </th>
                    <th scope="col" className='px-6 py-3'>Product</th>
                    <th scope="col" className='px-6 py-2'>Category</th>
                    <th scope="col" className='px-6 py-2'>Price</th>
                    <th scope="col" className='px-6 py-2'>Stock</th>
                    <th scope="col" className='px-4 py-2'>Status</th>
                    <th scope="col" className='px-6 py-2'>Seller</th>
                    <th scope="col" className='px-6 py-2'>Published</th>
                    <th scope="col" className='px-6 py-2'>Action</th>
                </tr>
                </thead>
                <tbody className={'table-auto'}>
                {products.map((product, index) => (
                    <tr key={index}
                        className='w-[100%] bg-white border-b dark:bg-[#19191C] dark:border-gray-700 border-gray-200'>
                        <td className='w-10 py-2 h-full text-center' scope="row">
                            <input type="checkbox" value={product?.id}
                                   className='border border-[#dee7f1] bg-[#fff] dark:bg-gray-600 dark:border-gray-500'/>
                        </td>
                        <td className='px-6 py-4' scope="row">
                            <div className='w-full flex items-center gap-2'>
                            <span className={'w-[40px] h-[40px] bg-[#F9F9FA] dark:bg-[#2A2F31] rounded-sm'}>
                              <img src={Logo} alt='product-img' className="p-2"/>
                            </span>
                                <div>
                                    <p className={"text-[#000000] dark:text-white text-[14px] font-bold flex items-center"}>{product?.product}</p>
                                    <p className={'text-[12px] text-[#6e829f]'}>SoundWave</p>
                                </div>
                            </div>
                        </td>
                        <td className='px-6 py-4 dark:text-[#FFFFFFCC]' scope="row">{product.category}</td>
                        <td className='px-6 py-4 dark:text-[#FFFFFFCC]' scope="row">${product.price}</td>
                        <td className='px-6 py-4 dark:text-[#FFFFFFCC]' scope="row">{product.stock}</td>
                        <td className='px-2 py-4' scope="row">
                        <span
                            className={'bg-[#5c67f71a] px-2 py-1 rounded-md text-[11px] text-[#5c67f7]'}>{product?.status}</span>
                            {/*<span*/}
                            {/*    className={'bg-[#fb42421a] px-2 py-1 rounded-md text-[11px] text-[#fb4242]'}>Published</span>*/}
                        </td>
                        <td className='px-6 py-4' scope="row">
                            <div className={'flex items-center gap-2 font-semibold'}>
                            <span
                                className={'w-[1.5rem] h-[1.5rem] p-1 rounded-full bg-white dark:bg-[#2A2F31] flex items-center'}>
                              <img src={Logo} alt={'product-img'} className='w-full h-full'/>
                            </span>
                                <p className={'text-[13px] font-semibold dark:text-[#F5F0F8] text-black'}>Mouyleang</p>
                            </div>
                        </td>
                        <td className='px-6 py-4 text-[#212B37] dark:text-[#FFFFFFCC]'
                            scope="row">{product.published}</td>
                        <td className='px-6 py-4' scope="row">
                            <div className={'flex items-center gap-2'}>
                                <a className={'p-2 bg-[#5c67f71a] rounded-md text-[#5c67f7] hover:bg-[#5c67f7] hover:text-white cursor-pointer'}><CiEdit/></a>
                                <a className={'p-2 bg-[#fb42421a] rounded-md text-[#fb4242] hover:bg-[#fb4242] hover:text-white cursor-pointer'}><RiDeleteBinLine/></a>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;
