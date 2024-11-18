"use client";

import { useAppDispatch, useAppSelector } from "client/redux/hooks";
import { modifyUser, selectUserById } from "client/redux/features/users";
import { Params } from "client/types/params/page";
import { useState, useEffect } from "react";
import { Avatar, Badge, Button, Chip, Input, Spinner } from "@nextui-org/react";
import { CameraIcon, LockClosedIcon, PencilIcon } from "@heroicons/react/24/outline";
import { fetchUserById } from "client/redux/features/users";
import { selecScoresByUserId } from "client/redux/features/scores";
import TableScoresByUser from "client/components/scores/tableScoresByUser";
import { CheckIcon } from "client/components/ui/CheckIcon";
import AddScoreModal from "client/components/scores/AddScoreModal";

const ProfileById = ({ params: { user_id } }: { params: Params }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUserById(user_id)(state));
  const userStatus = useAppSelector((state) => state.users.status);
  const userScores = useAppSelector((state) => selecScoresByUserId(user_id)(state));
  const [isHovering, setIsHovering] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [isConfirmingChanges, setIsConfirmingChanges] = useState(false); // Estado para confirmar cambios
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddScore = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const validTypes = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    if (user_id && !user) {
      dispatch(fetchUserById(user_id));
    }
  }, [user_id, user, dispatch]);

  // Handler para la carga de avatar
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a PNG, JPG, or JPEG image.");
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size exceeds the maximum limit of 5MB.");
        return;
      }

      setNewAvatar(file); // Guardar imagen seleccionada
      setIsConfirmingChanges(true); // Indicar que estamos esperando confirmación
    }
  };

  // Handler para la edición de nombre
  const handleNameChange = () => {
    setIsEditingName(true); // Activar edición de nombre
  };

  const handleNameUpdate = () => {
    if (newName !== user?.name || newAvatar) {  // Solo actualizar si algo ha cambiado
      setIsConfirmingChanges(true); // Esperar confirmación de ambos cambios
    }
    setIsEditingName(false);  // Salir del modo de edición
  };

  const handleConfirmChanges = async () => {
    if (newName !== user?.name || newAvatar) {
      const formData = new FormData();

      if (newName !== user?.name) {
        formData.append("name", newName || "");  // Si el nombre cambió, agregarlo
      }

      if (newAvatar) {
        formData.append("file", newAvatar);  // Si la imagen cambió, agregarla
      }

      setIsLoading(true);
      await dispatch(modifyUser({ userId: user_id, formData }));
      dispatch(fetchUserById(user_id)); // Refrescar los datos del usuario
      setIsLoading(false);
    }

    setIsConfirmingChanges(false); // Finalizar confirmación de cambios
  };

  const handleCancelChanges = () => {
    setIsConfirmingChanges(false); // Cancelar cambios
    setNewAvatar(null); // Resetear avatar
    setNewName(user?.name || ''); // Resetear nombre
  };

  if (userStatus === "loading" || !user) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const content =
    user.status === "ACTIVE" ? (
      <CheckIcon />
    ) : (
      <LockClosedIcon className="w-4 text-white" />
    );
  const color = user.status === "ACTIVE" ? "success" : "danger";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        {/* Avatar Section */}
        <div
          className="relative cursor-pointer max-w-36 h-max-36"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Badge isOneChar content={content} color={color} size="lg" placement="top-right">
            <Avatar
              radius="sm"
              src={user.avatar}
              alt="Profile Avatar"
              className="w-32 h-32 text-large"
            />
          </Badge>
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-sm">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <CameraIcon className="w-8 h-8 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
          )}
        </div>


        {/* Name and Email Section */}
        <div className="flex flex-col pt-6">
          {isEditingName ? (
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleNameUpdate}
              onKeyPress={(e) => e.key === "Enter" && handleNameUpdate()}
              className="text-white"
            />
          ) : (
            <div className="relative">
              <PencilIcon onClick={handleNameChange} className="absolute top-0 -right-4 w-4 h-4 text-white cursor-pointer" />
              <h1 className="text-white text-heading5 ">{user.name}</h1>
            </div>
          )}
          <Chip variant="flat" color="secondary" className="text-white">
            {user.email}
          </Chip>

        </div>



      </div>

      {/* Confirm Changes Modal */}
      {isConfirmingChanges && (
        <div className="flex gap-4 ">
          <button className="hover:bg-gradient-3 p-2 rounded-lg" onClick={handleConfirmChanges} disabled={isLoading}>
            Confirmar Cambios
          </button>
          <button className="hover:bg-gradient-3 p-2 rounded-lg" onClick={handleCancelChanges}>Cancelar</button>
        </div>
      )}
      <div>
        <Button color="success" onClick={handleAddScore}>
          Add Score
        </Button>
      </div>
      <TableScoresByUser data={userScores} />

      {/* Add Score Modal */}
      {isModalOpen && <AddScoreModal userId={user_id} onClose={closeModal} />}
    </div>
  );
};

export default ProfileById;
