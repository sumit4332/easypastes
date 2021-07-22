import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Link,
	Collapse,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { HiMenu, HiX } from 'react-icons/hi';

export default function WithSubnavigation() {
	const router = useRouter();
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
			>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}
				>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <HiX /> : <HiMenu />}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: 'center', md: 'start' }}
				>
					<Text
						textAlign={useBreakpointValue({
							base: 'center',
							md: 'left'
						})}
						fontFamily={'heading'}
						color={useColorModeValue('gray.800', 'white')}
					>
						Logo
					</Text>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}
				>
					<NextLink href="/sign-in" passHref>
						<Button
							as={'a'}
							fontSize={'sm'}
							fontWeight={400}
							variant={'link'}
						>
							Sign In
						</Button>
					</NextLink>
					<NextLink href="sign-up" passHref>
						<Button
							as="a"
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'sm'}
							fontWeight={600}
							color={'white'}
							bg={'purple.400'}
							_hover={{
								bg: 'purple.300'
							}}
						>
							Sign Up
						</Button>
					</NextLink>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map(navItem => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}
		>
			{NAV_ITEMS.map(navItem => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, href }: NavItem) => {
	const { isOpen } = useDisclosure();

	return (
		<Stack spacing={4}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none'
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}
				>
					{label}
				</Text>
			</Flex>
		</Stack>
	);
};

interface NavItem {
	label: string;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'My Pastes',
		href: '/user/pastes'
	}
];