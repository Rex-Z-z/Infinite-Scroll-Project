import React from 'react'

import AccountSection from './components/account-section'
import PasswordSection from './components/password-section'
import SourcesSection from './components/sources-section'

const page = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Account Section */}
      <AccountSection />

      {/* Password Section */}
      <PasswordSection />

      {/* Sources Section */}
      <SourcesSection />
    </div>
  )
}

export default page
