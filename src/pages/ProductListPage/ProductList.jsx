import React, {useEffect} from 'react'
import Layout from '../../components/PageLayout/Layout';
import ProductTable from '../../components/ProductList/ProductTable';


export default function SellerList() {
      useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div>
           <Layout>
                <ProductTable />
           </Layout>
        </div>
  )
}


