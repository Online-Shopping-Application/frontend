import React, {useEffect} from 'react'
import SellerTable from '../../components/SellerList/SellerTable';
import Layout from '../../components/PageLayout/Layout';


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
                <SellerTable />
           </Layout>
        </div>
  )
}
