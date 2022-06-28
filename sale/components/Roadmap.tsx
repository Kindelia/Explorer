import { classNames } from '@kindelia/lib/react/classNames'
import { RoadmapPhase } from '@/lib/roadmap'
import { FC, useState } from 'react'
import { roadmap } from '@/lib/roadmap'

export const Roadmap: FC = () => {
  const [selected, setSelected] = useState(roadmap[0])

  const handleSelectPhase = (phase: RoadmapPhase) => setSelected(phase)

  return (
    <div className="flex flex-col flex-1 space-y-16 text-primary-light">
      <div className="flex flex-row justify-between text-inset-light space-x-3">
        {roadmap.map((phase) => (
          <button
            className="bg-primary-light flex flex-1 shadow-md rounded-md justify-center uppercase py-5 h-80 text-xl"
            onClick={() => handleSelectPhase(phase)}
            key={phase.title}
          >
            {phase.title}
          </button>
        ))}
      </div>
      <div className="space-y-8">
        <div className="text-3xl">
          <span className="font-bold">{selected.title}</span>{' '}
          <span>Work Scope</span>
        </div>
        <div className="space-y-3">
          {selected.workscope.map((task) => (
            <div className="flex flex-row space-x-3" key={task.title}>
              <div
                className={classNames(
                  task.done ? '' : 'text-transparent',
                  'bg-inset-light text-center flex items-center px-6 rounded-md font-bold text-xl'
                )}
              >
                Done
              </div>
              <div className="bg-inset-light flex flex-col flex-1 px-4 py-5 rounded-md">
                <div className="text-xl font-bold">{task.title}</div>
                <div className="text-secondary-light font-semibold text-lg">
                  {task.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
