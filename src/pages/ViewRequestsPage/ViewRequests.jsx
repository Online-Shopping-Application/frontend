import React, {useEffect} from 'react'
import Layout from '../../components/PageLayout/Layout';
import RequestForm from '../../components/RequestForm/RequestForm';


export default function SellerList() {
      useEffect(() => {
        document.body.style.overflow = 'auto';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div>
           <Layout>
                <RequestForm />
           </Layout>
        </div>
  )
}
