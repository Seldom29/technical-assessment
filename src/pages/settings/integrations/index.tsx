
import IntegrationConnection from './connections';
import IntegrationServices from './services';

export default function SettingsIntegrationPage() {
    return (
        <div>
            <IntegrationServices />
            <IntegrationConnection />
        </div>
    );
}
