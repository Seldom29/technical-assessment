
import { faker } from "@faker-js/faker";

import AmazonLogo from '@/assets/images/amazon_logo.png';
import KafkaLogo from '@/assets/images/kafka_logo.png';
import PowerLogo from '@/assets/images/power_logo.png';
import ZapierLogo from '@/assets/images/zapier_logo.png';
import TableauLogo from '@/assets/images/tableau_logo.png';
import MeasurablLogo from '@/assets/images/measurabl_logo.png';
import type { IntegrationService } from './data.types';

faker.seed(2026);

const services = [
    {
        name: "Amazon QuickSight",
        description: "Amazon BI service to create dashboards and interactive visualisations.",
        logo: AmazonLogo,
    },
    {
        name: "Kafka",
        description: "Real-time data streaming, event-driven architectures and messaging systems.",
        logo: KafkaLogo,
    },
    {
        name: "Power BI",
        description: "Microsoft BI service to create dashboards and data visualisations.",
        logo: PowerLogo,
    },
    {
        name: "Zapier",
        description: "Automation tool that connects various apps and services to automate workflows.",
        logo: ZapierLogo,
    },
    {
        name: "Tableau",
        description: "BI service that helps seeing and transforming data into actionable insights.",
        logo: TableauLogo,
    },
    {
        name: "Measurabl",
        description: "Enable the push and pull of data to and from Measurabl via an API.",
        logo: MeasurablLogo,
    },
];

export const INTEGRATION_SERVICES: IntegrationService[] = services.map(
    (s) => ({
        id: faker.string.uuid(), // stable because of seed
        ...s,
    })
);


