'use client';
import { DecisionSupport } from '@/components/dashboard/decision-support';
import { FieldZones } from '@/components/dashboard/field-zones';
import { useLanguage } from '@/i18n/provider';

export default function MyFieldsPage() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                {t('myFieldsPage.title')}
                </h1>
                <p className="text-muted-foreground">
                {t('myFieldsPage.description')}
                </p>
            </div>

            <FieldZones />

            <DecisionSupport />

        </div>
    )
}