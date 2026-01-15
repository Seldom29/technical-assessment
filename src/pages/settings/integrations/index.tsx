
import IntegrationConnection from './connections';
import IntegrationServices from './services';

export default function SettingsIntegrationPage() {
    return (
        <div className='flex h-full flex-col'>
            <IntegrationServices />

            <div className='flex-1'>
                <IntegrationConnection />
            </div>
        </div>

    );
}
