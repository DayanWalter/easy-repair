import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
	return (
		<div className="container mx-auto py-8">
			<Skeleton className="h-8 w-48 mb-6" /> {/* Für "Einstellungen" Titel */}
			<div className="space-y-6">
				{/* Profil Einstellungen Skeleton */}
				<Card className="p-6">
					<Skeleton className="h-7 w-32 mb-4" /> {/* Für "Profil" */}
					<div className="flex items-center gap-4 mb-6">
						<Skeleton className="h-12 w-12 rounded-full" /> {/* Für Avatar */}
						<Skeleton className="h-10 w-40" />{" "}
						{/* Für "Profilbild ändern" Button */}
					</div>
					<div className="space-y-4">
						<div>
							<Skeleton className="h-5 w-16 mb-2" /> {/* Für "Name" Label */}
							<Skeleton className="h-10 max-w-md" /> {/* Für Name Input */}
						</div>
						<div>
							<Skeleton className="h-5 w-16 mb-2" /> {/* Für "E-Mail" Label */}
							<Skeleton className="h-10 max-w-md" /> {/* Für Email Input */}
						</div>
					</div>
				</Card>

				{/* Export Einstellungen Skeleton */}
				<Card className="p-6">
					<Skeleton className="h-7 w-48 mb-4" /> {/* Für "Daten & Export" */}
					<div className="space-y-4">
						<div>
							<Skeleton className="h-10 w-40 inline-block mr-3" />{" "}
							{/* Für "Produkte exportieren" */}
							<Skeleton className="h-10 w-40 inline-block" />{" "}
							{/* Für "Kunden exportieren" */}
						</div>
						<Skeleton className="h-4 w-[80%]" /> {/* Für Beschreibungstext */}
					</div>
				</Card>

				{/* Benachrichtigungen Skeleton */}
				<Card className="p-6">
					<Skeleton className="h-7 w-48 mb-4" />{" "}
					{/* Für "Benachrichtigungen" */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Skeleton className="h-5 w-5" /> {/* Für Checkbox */}
							<Skeleton className="h-5 w-48" />{" "}
							{/* Für "E-Mail Benachrichtigungen" */}
						</div>
						<div className="flex items-center space-x-2">
							<Skeleton className="h-5 w-5" /> {/* Für Checkbox */}
							<Skeleton className="h-5 w-40" /> {/* Für "Marketing E-Mails" */}
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
