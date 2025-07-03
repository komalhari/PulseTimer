import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { changeUsername } from "@/lib/services/changeUsername";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const Profile = ({ userName, userId }) => {
  const schema = yup.object().shape({
    NewUserName: yup.string(),
  });

  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [click, setClick] = useState(false);

  const onSubmit = async ({ NewUserName }) => {
    try {
      if (userName === NewUserName) {
        setClick(false);
      } else {
        const res = await changeUsername({ userId, NewUserName });
        setClick(false);
        console.log(res);

        if (res.username === NewUserName) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <Label htmlFor="Display Name">Display Name</Label>
            <Input
              disabled={!click}
              type="text"
              id="username"
              className={"w-2/3"}
              defaultValue={userName}
              {...register("NewUserName")}
            />
          </div>

          {!click ? (
            <Button
              onClick={() => setClick(true)}
              className="text-black place-self-start"
              variant={"link"}
            >
              Change
            </Button>
          ) : (
            <div className="flex">
              <Button
                onClick={() => setClick(false)}
                className="text-black place-self-start"
                variant={"link"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="text-black place-self-start"
                variant={"link"}
              >
                Apply
              </Button>
            </div>
          )}
        </form>
      </div>

      <div className="grid w-full max-w-sm items-center gap-3"></div>
    </>
  );
};

export default Profile;
