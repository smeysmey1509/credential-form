import React, {useEffect, useState, useRef} from "react";
import Logo from '../../../../assets/react.svg'
import {CiEdit} from "react-icons/ci";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {RiDeleteBinLine} from "react-icons/ri";
import ProductService from "../../../../services/common/ProductService/ProductService";
import {ProductType} from "../../../../types/ProductType";
import {motion, AnimatePresence} from "framer-motion";
import socket from '../../../../services/socket/socket'
import FlexTable, {UserData, UserTableColumns} from "../../../common/FlexTable/FlexTable";
import {toolbarVariants, dropdownVariants} from '../../../../animation/animation'
import GrayButton from "../../../../Work/Button/GrayButton/GrayButton";

const columns: UserTableColumns[] = [
    {key: 'id', label: 'ID', show: true},
    {key: 'username', label: 'Username', show: true},
    {key: 'email', label: 'Email', show: true},
    {key: 'createdAt', label: 'Create at', show: true},
    {key: 'updatedAt', label: 'Update at', show: true},
    {key: 'isActive', label: 'Status', show: true},
];

const data: UserData[] = [
    {
        id: 1,
        username: 'User1',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'ACTIVE',
        profile: 'https://i.pravatar.cc/100?img=1',
    },
    {
        id: 2,
        username: 'User2',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'ONHOLD',
        profile: 'https://i.pravatar.cc/100?img=2',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: 3,
        username: 'User3',
        email: 'email@example.com',
        createdAt: '19-01-2025',
        updatedAt: '19-01-2025',
        isActive: 'DEACTIVATE',
        profile: 'https://i.pravatar.cc/100?img=3',
    },
];

const ListProduct: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [totalPerPage, setTotalPerPage] = useState<number>(10);
    const [changeStatus, setChangeStatus] = useState<boolean>(true);
    const [selectionToolbar, setSelectionToolbar] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState({
        query: ""
    });
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        handleFetchProducts();

        const handleCreated = (newProduct: ProductType) => {
            if (!newProduct || !newProduct._id || !newProduct.name) return; // Validate

            setProducts((prev) => {
                const exists = prev.some((p) => p._id === newProduct._id);
                if (exists) return prev;

                // Insert only on first page
                if (currentPage === 1) {
                    return [newProduct, ...prev.slice(0, itemsPerPage - 1)];
                }

                return prev;
            });

            setTotalItems((prev) => prev + 1);
        };

        const handleProductUpdated = (updatedProduct: Partial<ProductType> & { _id: string }) => {
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p._id === updatedProduct._id ? {...p, ...updatedProduct} : p
                )
            );
        };

        const handleDeleted = (deletedId: string) => {
            setProducts((prev) => prev.filter((p) => p._id !== deletedId));
            setTotalItems((prev) => prev - 1);
        };

        socket.on("product:created", handleCreated);
        socket.on("product:edit", handleProductUpdated);
        socket.on("product:deleted", handleDeleted);

        return () => {
            socket.off("product:created", handleCreated);
            socket.off("product:edit", handleProductUpdated);
            socket.off("product:deleted", handleDeleted);
        };
    }, [currentPage, itemsPerPage]);

    const handleFoundProduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput((prev) => ({...prev, query: value}));

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(async () => {
            if (value.trim() === "") {
                await handleFetchProducts();
                return;
            }
            try {
                const res = await ProductService.searchProduct(value);
                setProducts(res.data.products);
                setTotalItems(res.data.total || 0);
            } catch (err) {
                console.error("Search failed:", err);
            }
        }, 300);
    };

    const handleFetchProducts = async () => {
        try {
            const response = await ProductService.getProduct(currentPage, itemsPerPage);
            const {products, total, perPage, totalPages} = response.data;

            setProducts(products);
            setTotalItems(total);
            setItemsPerPage(perPage);
            setTotalPerPage(totalPages)
        } catch (e) {
            console.error("Failed to fetch:", e);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            const deleted = await ProductService.deleteProduct(productId);
            if (deleted) {
                setProducts((prevProducts) => prevProducts.filter((selectedId) => selectedId._id !== productId));
                setTotalItems(prev => prev - 1);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChangeStatus = () => {
        setChangeStatus((prevState) => !prevState);
    }

    const handleDeleteMultipleProducts = async () => {
        try {
            if (selectedProductIds.length === 0) return;

            console.log("Sending to backend:", selectedProductIds);

            const response = await ProductService.multiDeleteProduct(selectedProductIds);

            // Update UI
            setProducts(prev =>
                prev.filter(product => !selectedProductIds.includes(product._id))
            );
            setSelectedProductIds([]);
            setSelectionToolbar(false)
            console.log(response.data.msg);
        } catch (error) {
            console.error("Failed to delete selected products:", error);
        }
    };

    return (
        <>
            <div className="w-full h-full flex ">
                <input
                    className="w-3/10 bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    type='text' placeholder="Serach ur product" value={searchInput.query}
                    onChange={handleFoundProduct}/>
            </div>
            <div className={'w-full h-[600px] overflow-x-auto mt-5'}>
                <table
                    className='table-fixed w-full max-h-full text-[0.85rem] font-normal text-left border-collapse'>
                    <thead className='text-sm sticky top-0 z-10 bg-[#fff] dark:bg-[#19191C]'>
                    <tr className="border-b dark:border-gray-700 border-gray-200">
                        <th scope="col" className='w-10 h-full py-2 text-center'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value=""
                                       className='peer appearance-none w-[1rem] h-[1rem] border border-[#dee7f1] rounded-sm accent-border-2 accent-bg-[#5C67F7] checked:bg-[#5C67F7] dark:border-[#ffffff1a]'/>
                                <span className="pointer-events-none absolute left-0 top-0 w-[1rem] h-[1rem]
                              before:content-[''] before:absolute before:inset-0 before:bg-transparent before:rounded-sm peer-checked:before:bg-[#5C67F7]
                              after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-xs peer-checked:after:opacity-100 after:opacity-0">
                            </span>
                            </label>
                        </th>
                        <th scope="col" className='w-[20%] px-6 py-2'>Product</th>
                        <th scope="col" className='px-6 py-2'>Category</th>
                        <th scope="col" className='px-6 py-2'>Price</th>
                        <th scope="col" className='px-6 py-2'>Stock</th>
                        <th scope="col" className='px-4 py-2'>Status</th>
                        <th scope="col" className='px-6 py-2'>Seller</th>
                        <th scope="col" className='w-[15%] px-6 py-2'>Published</th>
                        <th scope="col" className='px-6 py-2'>Action</th>
                    </tr>
                    </thead>
                    <tbody className={'table-auto'}>
                    {products?.map((product, index) => (
                        <tr key={index}
                            className='w-[100%] bg-white border-b dark:bg-[#19191C] dark:border-gray-700 border-gray-200'>
                            <td scope="col" className='w-10 h-full py-2 text-center'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" checked={selectedProductIds.includes(product._id)}
                                           onChange={(e) => {
                                               if (e.target.checked) {
                                                   setSelectedProductIds([...selectedProductIds, product._id]);
                                                   setSelectionToolbar(true);
                                                   setChangeStatus(false);
                                               } else {
                                                   setSelectedProductIds(selectedProductIds.filter(id => id !== product._id));
                                                   if (selectedProductIds.length === 1) {
                                                       setSelectionToolbar(false);
                                                       setChangeStatus(false);
                                                   }
                                               }
                                           }}
                                           className='peer appearance-none w-[1rem] h-[1rem] border border-[#dee7f1] rounded-sm accent-border-2 accent-bg-[#5C67F7] checked:bg-[#5C67F7] dark:border-[#ffffff1a]'/>
                                    <span className="pointer-events-none absolute left-0 top-0 w-[1rem] h-[1rem]
                                       before:content-[''] before:absolute before:inset-0 before:bg-transparent before:rounded-sm peer-checked:before:bg-[#5C67F7]
                                       after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:text-xs peer-checked:after:opacity-100 after:opacity-0">
                                    </span>
                                </label>
                            </td>
                            <td className='px-6 py-4' scope="row">
                                <div className='w-full flex items-center gap-2'>
                                    <span className={'w-[40px] h-[40px] bg-[#F9F9FA] dark:bg-[#2A2F31]'}>
                                      <img src={product?.image} alt='product-img'
                                           className="p-1 w-full h-full object-cover rounded-[50%]"/>
                                    </span>
                                    <div>
                                        <p className={"text-[#000000] dark:text-white text-[14px] font-bold flex items-center"}>{product?.name}</p>
                                        <p className={'text-[12px] text-[#6e829f]'}>SoundWave</p>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-4 dark:text-[#FFFFFFCC]' scope="row">{product.category?.name}</td>
                            <td className='px-6 py-4 dark:text-[#FFFFFFCC]' scope="row">${product.price}</td>
                            <td className='px-6 py-4 dark:text-[#FFFFFFCC]' scope="row">{product.stock}</td>
                            <td className='px-4 py-2' scope="row">
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
                                    <p className={'text-[13px] font-semibold dark:text-[#F5F0F8] text-black'}>{product?.seller?.name}</p>
                                </div>
                            </td>
                            <td className='px-6 py-4 text-[#212B37] dark:text-[#FFFFFFCC]'
                                scope="row">{product?.createdAt}</td>
                            <td className='px-6 py-4' scope="row">
                                <div className={'flex items-center gap-2'}>
                                    <span
                                        className={'p-2 bg-[#5c67f71a] rounded-md text-[#5c67f7] hover:bg-[#5c67f7] hover:text-white cursor-pointer'}><CiEdit/></span>
                                    <span
                                        className={'p-2 bg-[#fb42421a] rounded-md text-[#fb4242] hover:bg-[#fb4242] hover:text-white cursor-pointer'}
                                        onClick={() => handleDeleteProduct(product?._id)}><RiDeleteBinLine/></span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <nav
                className="relative w-full h-fit flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation">
            <span
                className="text-sm font-normal text-gray-500 dark:text-[#fff] mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing <span className="font-semibold text-gray-900 dark:text-white">
                    {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)}
                </span> of <span className="font-semibold text-gray-900 dark:text-white">
                    {totalItems}
                </span>
            </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-[#19191C] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Previous
                        </button>
                    </li>

                    {(() => {
                        const pageNumbers = [];
                        let start = Math.max(1, currentPage - 2);
                        let end = Math.min(totalPerPage, start + 4);

                        if (end - start < 4) {
                            start = Math.max(1, end - 4);
                        }

                        for (let i = start; i <= end; i++) {
                            pageNumbers.push(i);
                        }

                        return pageNumbers.map((page) => (
                            <li key={page}>
                                <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-12 flex items-center justify-center px-3 h-8 leading-tight border ${
                                        currentPage === page
                                            ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-[#19191C] dark:text-white"
                                            : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-[#19191C] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                                    } border-gray-300 dark:border-gray-700`}
                                >
                                    {page}
                                </button>
                            </li>
                        ));
                    })()}

                    <li>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPerPage))}
                            disabled={currentPage === totalPerPage}
                            className="flex items-center justify-center px-3 h-8 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:bg-[#19191C] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
            <AnimatePresence>
                {
                    selectionToolbar && (
                        <motion.div
                            className='w-fit h-fit fixed bottom-0 left-[50%] transform -translate-x-[25%] -translate-y-1/2 z-50 flex items-center justify-center bg-white dark:bg-[#19191C] shadow-[0px_0px_4px_0px_rgba(0,_0,_0,_0.15)] dark:shadow-[0px_0px_4px_0px_rgba(0,_0,_0,_0.35)] rounded-lg'
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                        >
                            <ul className="flex justify-center items-center text-[14px]">
                                <li className="flex items-center justify-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span
                                    className="text-sm font-normal text-gray-500 dark:text-[#fff] mb-4 md:mb-0 block w-full md:inline md:w-auto">
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {selectedProductIds?.length}
                                    </span> of <span className="font-semibold text-gray-900 dark:text-white">
                                        {totalItems}
                                    </span>
                                </span>
                                </li>
                                <li className="relative flex items-center justify-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleChangeStatus}>
                                    <CiEdit/>
                                    <AnimatePresence>
                                        {
                                            changeStatus && (
                                                <motion.ul
                                                    className="absolute bottom-[125%] left-1/2 text-[12px] w-[80%] h-fit transform -translate-x-1/2 bg-white dark:bg-[#19191C] shadow-[0px_0px_4px_0px_rgba(0,_0,_0,_0.15)] rounded-lg border-none overflow-hidden border-0 group-hover:pointer-events-auto pointer-events-auto z-10"
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    variants={toolbarVariants}
                                                >
                                                    <li className="p-2 hover:bg-gray-100 dark:bg-[#19191C] dark:hover:bg-gray-700">Published</li>
                                                    <li className="p-2 hover:bg-gray-100 dark:bg-[#19191C] dark:hover:bg-gray-700">Unpublished</li>
                                                </motion.ul>
                                            )
                                        }
                                    </AnimatePresence>
                                    <span className=''>Change Status</span>
                                    <MdOutlineKeyboardArrowDown/>
                                </li>
                                <li className="flex items-center justify-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span>Duplicate</span>
                                </li>
                                <li className="flex items-center justify-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={handleDeleteMultipleProducts}>
                                    <span className='text-red-500'>Delete All</span>
                                </li>
                            </ul>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className="p-4 bg-[#D9D9D933] min-h-screen flex flex-col gap-10">
                <FlexTable columns={columns} data={data} showAvatar showCheckbox={true}
                           showAction={true}/>
            </div>
            <GrayButton label="Cancel"/>
        </>
    );
};

export default ListProduct;
