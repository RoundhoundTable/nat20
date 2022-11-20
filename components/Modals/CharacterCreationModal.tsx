import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import StatInput from "../StatInput";
import AttributeInput from "../AttributeInput";
import { useForm } from "../../hooks/useForm";
import useModal from "../../hooks/useModal";
import { useCreateCharacter } from "../../hooks/useCreateCharacter";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export interface ICharacterForm {
  name: string;
  race: string;
  class: string;
  level: string;
  initiative: string;
  hitPoints: string;
  proficiencyBonus: string;
  classArmor: string;
  speed: string;
  picture: string;
  stats: string;
}

interface IStatsForm {
  STR: string;
  DEX: string;
  CON: string;
  INT: string;
  WIS: string;
  CHA: string;
}

const CharacterCreationModal: NextComponentType = () => {
  const { form, onChange, submit, updateForm } = useForm<ICharacterForm>({});
  const { form: statsForm, onChange: onStatChange } = useForm<IStatsForm>({});
  const { createCharacter } = useCreateCharacter(form);
  const [ready, setReady] = useState(false);
  const { unsetModal } = useModal();
  const [image, setImage] = useState<File | null>(null);
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");

  const handleAttachImage = (ev: any) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const file = ev.target.files[0];
      const url = URL.createObjectURL(file);

      setImage(file);
      setImageObjectUrl(url);
    }
  };

  const revokeAttachedImage = () => {
    URL.revokeObjectURL(imageObjectUrl);
    setImage(null);
    setImageObjectUrl("");
  };

  const submitWrapper = (ev: any) => {
    ev.preventDefault();

    let parsedStats: Record<string, number> | string = {};

    Object.keys(statsForm).forEach((stat) => {
      (parsedStats as Record<string, number>)[stat] = parseInt(
        statsForm[stat as keyof IStatsForm]
      );
    });

    parsedStats = JSON.stringify(parsedStats);

    let parsedForm = {
      ...form,
      stats: parsedStats,
    };

    updateForm(parsedForm);

    if (image) {
      const reader = new FileReader();

      reader.readAsDataURL(image);

      return (reader.onload = () => {
        updateForm({ ...form, picture: reader.result as string });
        setReady(true);
      });
    }

    setReady(true);
  };

  useEffect(() => {
    if (ready) {
      submit({ func: createCharacter });
    }
  }, [ready]);

  return (
    <form
      className="flex flex-col items-center gap-10"
      onSubmit={submitWrapper}
    >
      <div className="border-b-2 w-60 lg:w-3/4 text-center border-b-primary-500 pb-2">
        <p className="text-2xl font-bold uppercase text-primary-500">
          CHARACTER CREATION
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-6">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col">
            <StatInput name="STR" label="STR" onChange={onStatChange} />
            <StatInput name="DEX" label="DEX" onChange={onStatChange} />
            <StatInput name="CON" label="CON" onChange={onStatChange} />
            <StatInput name="INT" label="INT" onChange={onStatChange} />
            <StatInput name="WIS" label="WIS" onChange={onStatChange} />
            <StatInput name="CHA" label="CHA" onChange={onStatChange} />
          </div>
          <div className="flex flex-col w-full lg:w-60 border-2 border-primary-500 rounded-xl shadow-lg">
            {image && (
              <Icon
                icon="ri:close-circle-fill"
                className="absolute z-20 text-danger-800 h-8 w-8 self-end translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={revokeAttachedImage}
              />
            )}
            <div className="relative top-0 left-0 grid items-center justify-center w-full h-full">
              <input
                type="file"
                className="absolute w-full h-full opacity-0"
                onChange={handleAttachImage}
                accept=".jpg,.jpeg,.png,.webp"
              />
              {imageObjectUrl ? (
                <img
                  src={imageObjectUrl}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full object-cover rounded-xl">
                  <Icon
                    icon="mdi:file-image-plus"
                    className="text-primary-500 w-8 h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Input name="name" label="Name" onChange={onChange} />
          <Input name="race" label="Race" onChange={onChange} />
          <Input name="class" label="Class" onChange={onChange} />
          <div className="flex flex-col lg:flex-row w-full items-center lg:gap-4">
            <Input name="level" label="Level" onChange={onChange} />
            <Input name="initiative" label="Initiative" onChange={onChange} />
            <Input name="proficiencyBonus" label="Bonus" onChange={onChange} />
            <Input name="speed" label="Speed" onChange={onChange} />
            <div className="flex flex-row mt-5">
              <AttributeInput
                name="hitPoints"
                placeholder="HP"
                icon="mdi:cards-heart"
                onChange={onChange}
              />
              <AttributeInput
                name="classArmor"
                placeholder="CA"
                icon="material-symbols:shield"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <Button>Create</Button>
            <Button
              type={"button"}
              onClick={unsetModal}
              className="border bg-black/20 border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-background-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CharacterCreationModal;

/* 
<form
      className="flex flex-col items-center gap-10 w-full h-full"
      onSubmit={submitWrapper}
    >
      <div className="border-b-2 w-3/4 text-center border-b-primary-500 pb-2">
        <p className="text-2xl font-bold uppercase text-primary-500">
          CHARACTER CREATION
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 justify-center">
        <div className="flex flex-row gap-5 justify-center">
          <div className="flex flex-col gap-2">
            <StatInput name="STR" label="STR" onChange={onStatChange} />
            <StatInput name="DEX" label="DEX" onChange={onStatChange} />
            <StatInput name="CON" label="CON" onChange={onStatChange} />
            <StatInput name="INT" label="INT" onChange={onStatChange} />
            <StatInput name="WIS" label="WIS" onChange={onStatChange} />
            <StatInput name="CHA" label="CHA" onChange={onStatChange} />
          </div>
          <div className="lg:w-60 w-full shrink">
            <div className="relative top-0 left-0 grid items-center justify-center w-full h-full">
              <input
                type="file"
                className="absolute w-60 h-full opacity-0"
                onChange={handleAttachImage}
                accept=".jpg,.jpeg,.png,.webp"
              />
              {imageObjectUrl ? (
                <img
                  src={imageObjectUrl}
                  className="w-full h-60 object-cover rounded-xl shadow-lg border-2 border-primary-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-80 lg:w-60 h-full object-cover rounded-xl shadow-lg border-2 border-primary-500">
                  <Icon
                    icon="mdi:file-image-plus"
                    className="text-primary-500 w-8 h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <div>
            <Input
              name="name"
              label="Name"
              className="sm:w-full w-full"
              onChange={onChange}
            />
            <Input
              name="race"
              label="Race"
              className="sm:w-full w-full"
              onChange={onChange}
            />
            <Input
              name="class"
              label="Class"
              className="sm:w-full w-full"
              onChange={onChange}
            />
            <div className="flex flex-row gap-5">
              <Input
                name="level"
                label="Level"
                wrapperClassname="w-1/4 items-center"
                className="text-center"
                onChange={onChange}
              />
              <Input
                name="initiative"
                label="Initiative"
                wrapperClassname="w-1/4 items-center"
                className="text-center"
                onChange={onChange}
              />
              <Input
                name="proficiencyBonus"
                label="P. Bonus"
                wrapperClassname="w-1/4 items-center"
                className="text-center"
                onChange={onChange}
              />
              <Input
                name="speed"
                label="Speed"
                wrapperClassname="w-1/4 items-center"
                className="text-center"
                onChange={onChange}
              />
              <AttributeInput
                name="hitPoints"
                placeholder="HP"
                icon="mdi:cards-heart"
                onChange={onChange}
              />
              <AttributeInput
                name="classArmor"
                placeholder="CA"
                icon="material-symbols:shield"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Button>Create</Button>
            <Button
              type={"button"}
              onClick={unsetModal}
              className="border bg-black/20 border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-background-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
*/
