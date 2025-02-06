import { getAnalytics } from '@/actions/analytics'
import Dashboard from '@/components/dashboard/Dashboard'
import React from 'react'

const page = async () => {

  const analytics = await getAnalytics() || []
  console.log(analytics);
  
  return (

    <div>
        <Dashboard analytics={analytics} />
    </div>

  )
}

export default page