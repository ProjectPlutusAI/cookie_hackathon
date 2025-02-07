import { Flex } from '@/ui/primitives'

export const LivePill = () => {
	return (
		<Flex className="bg-neonRed rounded-full text-white font-medium px-2 py-1">
			<span className="inline-block bg-primary rounded-full w-2 h-2 mr-2 animate-pulse" />
			LIVE
		</Flex>
	)
}
