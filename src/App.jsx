import { useState, useEffect } from 'react'
import Header from './components/Header'
import AgentCard from './components/AgentCard'
import Footer from './components/Footer'
import useAgentData from './hooks/useAgentData'

export default function App() {
  const { agents, topPerformer, refreshing } = useAgentData()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <Header />
        
        <main className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {agents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isTopPerformer={agent.id === topPerformer?.id}
                refreshing={refreshing}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}