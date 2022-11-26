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
import { createCharacterSchema } from "../../validation/Character";
import { blobToDataUrl } from "../../utils/blobToData";
import useLoading from "../../hooks/useLoading";

interface IStats {
  STR: string | number;
  DEX: string | number;
  CON: string | number;
  INT: string | number;
  WIS: string | number;
  CHA: string | number;
}
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
  stats: IStats | string;
}

const CharacterCreationModal: NextComponentType = () => {
  const { loading } = useLoading();
  const { form, onChange, submit, updateForm, errors } =
    useForm<ICharacterForm>({
      schema: createCharacterSchema,
    });
  const { createCharacter } = useCreateCharacter(form);
  const { unsetModal } = useModal();
  const [ready, setReady] = useState(false);
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

  const submitWrapper = () => {
    let parsedStats: Partial<IStats> | string = {};

    Object.keys(form.stats).forEach((stat: string) => {
      const statKey = stat as keyof IStats;
      (parsedStats as IStats)[statKey] = (form.stats as IStats)[statKey];
    });

    parsedStats = JSON.stringify(parsedStats);

    updateForm({ stats: parsedStats });

    setReady(true);
  };

  useEffect(() => {
    (async () => {
      if (!image) return;
      const data = await blobToDataUrl(image);

      updateForm({ ...form, picture: data });
    })();
  }, [image]);

  useEffect(() => {
    if (ready) createCharacter();
  }, [ready]);

  const checkStatError = (stat: string) => {
    if (!errors?.stats) return false;

    return Boolean(
      typeof errors.stats === "string"
        ? true
        : errors.stats[stat as keyof IStats]
    );
  };

  return (
    <form
      className={`flex flex-col items-center gap-10 ${
        loading ? "blur-md" : "blur-none"
      }`}
      onSubmit={(ev: any) => submit({ ev, func: submitWrapper })}
    >
      <div className="border-b-2 w-60 lg:w-3/4 text-center border-b-primary-500 pb-2">
        <p className="text-2xl font-bold uppercase text-primary-500">
          CHARACTER CREATION
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-6">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col">
            <StatInput
              name="stats.STR"
              label="STR"
              onChange={onChange}
              error={checkStatError("STR")}
            />
            <StatInput
              name="stats.DEX"
              label="DEX"
              onChange={onChange}
              error={checkStatError("DEX")}
            />
            <StatInput
              name="stats.CON"
              label="CON"
              onChange={onChange}
              error={checkStatError("CON")}
            />
            <StatInput
              name="stats.INT"
              label="INT"
              onChange={onChange}
              error={checkStatError("INT")}
            />
            <StatInput
              name="stats.WIS"
              label="WIS"
              onChange={onChange}
              error={checkStatError("WIS")}
            />
            <StatInput
              name="stats.CHA"
              label="CHA"
              onChange={onChange}
              error={checkStatError("CHA")}
            />
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
          <Input
            name="name"
            label="Name"
            onChange={onChange}
            error={Boolean(errors?.name)}
          />
          <Input
            name="race"
            label="Race"
            onChange={onChange}
            error={Boolean(errors?.race)}
          />
          <Input
            name="class"
            label="Class"
            onChange={onChange}
            error={Boolean(errors?.class)}
          />
          <div className="flex flex-col lg:flex-row w-full items-center lg:gap-4">
            <Input
              name="level"
              label="Level"
              type={"number"}
              onChange={onChange}
              error={Boolean(errors?.level)}
            />
            <Input
              name="initiative"
              label="Initiative"
              type={"number"}
              onChange={onChange}
              error={Boolean(errors?.initiative)}
            />
            <Input
              name="proficiencyBonus"
              label="Bonus"
              type={"number"}
              onChange={onChange}
              error={Boolean(errors?.proficiencyBonus)}
            />
            <Input
              name="speed"
              label="Speed"
              type={"number"}
              onChange={onChange}
              error={Boolean(errors?.speed)}
            />
            <div className="flex flex-row mt-5">
              <AttributeInput
                name="hitPoints"
                placeholder="HP"
                icon="mdi:cards-heart"
                onChange={onChange}
                error={Boolean(errors?.hitPoints)}
              />
              <AttributeInput
                name="classArmor"
                placeholder="CA"
                icon="material-symbols:shield"
                onChange={onChange}
                error={Boolean(errors?.classArmor)}
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
