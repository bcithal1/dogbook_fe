import {
	useDeleteDogProfile,
	useUpdateDogProfile,
	useUploadDogPhoto,
} from "@/queries/dog.queries";
import { DogProfile } from "@/types/dog-profile";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Router, useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import ImageUploadComponent from "../ImageUploadComponent";
import EditDog from "./EditDog";

function EditButton({
	dogProfile,
	accessToken,
	userId,
}: {
	dogProfile: DogProfile;
	accessToken: string;
	userId: number;
}) {
	const {
		isOpen: openModal,
		onOpen: modal,
		onClose: closeModal,
	} = useDisclosure();
	const {
		isOpen: openDelete,
		onOpen: deleteDog,
		onClose: closeDelete,
	} = useDisclosure();
	const {
		isOpen: openPhotoUpload,
		onOpen: photoUpload,
		onClose: closePhotoUpload,
	} = useDisclosure();

	const [selectedFile, setSelectedFile] = useState(null);
	const cancelRef = React.useRef();
	const router = useRouter();
	const deleteDogProfile = useDeleteDogProfile(accessToken);
	const uploadPhotoMutation = useUploadDogPhoto(accessToken);
	const updateDogProfile = useUpdateDogProfile(accessToken);
	const queryClient = useQueryClient();

	const handleFileSelect = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	async function handlePhotoUpload() {
		const photoResponse = await uploadPhotoMutation.mutateAsync({
			dogId: dogProfile.dog.id,
			file: selectedFile,
		});
		const profilePhotoId = await photoResponse.data;
		dogProfile.profilePhotoId = profilePhotoId;
		await updateDogProfile.mutateAsync(dogProfile);
		if (updateDogProfile.isSuccess) {
			queryClient.invalidateQueries();
			closePhotoUpload();
		}
	}

	function handleDelete() {
		deleteDogProfile.mutate(dogProfile.id);
		if (deleteDogProfile.isSuccess) {
			router.push({
				pathname: `/user-profile`,
				query: { myParam: JSON.stringify(userId) },
			});
		}
	}

	return (
		<>
			<Menu>
				<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
					Edit
				</MenuButton>
				<MenuList>
					<MenuItem onClick={photoUpload}>Change Profile Picture</MenuItem>
					<MenuItem onClick={modal}>Edit About Info</MenuItem>
					<MenuItem onClick={deleteDog}>Delete Dog Profile</MenuItem>
				</MenuList>
			</Menu>

			<Modal isOpen={openPhotoUpload} onClose={closePhotoUpload} size={"lg"}>
				<ModalOverlay />
				<ModalContent width={"2xl"}>
					<ModalCloseButton />
					<ModalBody marginTop={"30px"}>
						<ImageUploadComponent handleFileSelect={handleFileSelect} />
					</ModalBody>
					<ModalFooter>
						<Button
							backgroundColor={"#886E58"}
							color={"white"}
							mr={3}
							onClick={handlePhotoUpload}
						>
							Save changes
						</Button>
						<Button
							color={"#886E58"}
							variant="ghost"
							onClick={closePhotoUpload}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Modal isOpen={openModal} onClose={closeModal} size={"md"}>
				<ModalOverlay />
				<ModalContent width={"5xl"}>
					<ModalCloseButton />
					<EditDog dogProfile={dogProfile} accessToken={accessToken} />
				</ModalContent>
			</Modal>
			<AlertDialog
				isOpen={openDelete}
				leastDestructiveRef={cancelRef}
				onClose={closeDelete}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold" color="#886E58">
							Delete Profile
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to delete {dogProfile.dog.name}'s profile?
							You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								backgroundColor={"#886E58"}
								color={"white"}
								onClick={handleDelete}
							>
								Delete
							</Button>
							<Button
								ref={cancelRef}
								onClick={closeDelete}
								ml={3}
								color={"#886E58"}
								variant="ghost"
							>
								Cancel
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
export default EditButton;
