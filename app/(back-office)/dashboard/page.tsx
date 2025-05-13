import { getAnalytics } from '@/actions/analytics'
import AuthorizePageWrapper from '@/components/dashboard/auth/AuthPageWrapper'
import Dashboard from '@/components/dashboard/Dashboard'
import { permissionsObj } from '@/config/permissions'
import React from 'react'

const page = async () => {

  const analytics = await getAnalytics() || []
  
  return (

    <AuthorizePageWrapper requiredPermission={permissionsObj.canViewDashboard}>
      <div>
        <Dashboard analytics={analytics} />
      </div>
    </AuthorizePageWrapper>

  )
}

export default page