interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    category: {
        name: string;
    };
    seller: {
        name: string;
        email: string;
    };
}

const ProductTable: React.FC = () => {
    return (
        <div>
            Hello World
        </div>
    );
};

export default ProductTable;
