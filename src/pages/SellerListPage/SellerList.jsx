import React, {useEffect} from 'react'
import SellerTable from '../../components/SellerList/SellerTable';
import Layout from '../../components/PageLayout/Layout';


function SellerList() {
      useEffect(() => {
        document.body.style.overflow = 'auto';

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

export default SellerList;
