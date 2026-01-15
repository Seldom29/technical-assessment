import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { getAllIntegrationServicesAsync, integrationServiceState } from '@/store/slices/integration-service.slice'
import { useEffect } from 'react'

export default function IntegrationServices() {
    const dispatch = useAppDispatch()
    const { services } = useAppSelector(integrationServiceState)

    useEffect(() => {
        dispatch(getAllIntegrationServicesAsync())
    }, [])

    return <div>
        <h2 className='text-base font-semibold text-slate-900'>Choose a Service to Connect</h2>
        <p className='mt-1 text-sm text-slate-500'>Connect BraveGen to other tools you use.</p>

        <div className='mt-4 grid gap-5 md:grid-cols-3'>
            {services.map((s) => (
                <div
                    key={s.id}
                    className='rounded-lg border border-border bg-gray-200 p-3 shadow-sm'
                >
                    <div className='flex flex-col justify-around items-start gap-2'>
                        <div className='inline-flex items-center gap-3'>
                            <img
                                src={s.logo}
                                alt={s.name}
                            />
                            <div className='font-semibold text-lg text-slate-900'>{s.name}</div>
                        </div>
                        <p className='mt-1 text-sm text-slate-600'>{s.description}</p>
                        <button
                            type='button'
                            className='mt-3 rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110'
                        >
                            Add Connection
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
}