import { useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Button, RTE, Input, Select } from '../index'
import service from '../../appwrite/config';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const submit = async(data) => {
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if(file){
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = await service.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback(value => {
        if(value && typeof value == "string"){
           return (
            value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-", "-")
            .replace(/\s/g, "-")
           );
        }

        return "";
    });

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if(name === 'title'){
                setValue(
                    "slug",
                    slugTransform(value.title),
                    {
                        shouldValidate: true
                    }
                );
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
        className="flex flex-wrap"
        onSubmit={handleSubmit(submit)} >
            <div className="w-2/3 px-2">
                <Input
                className="mb-4"
                label="Title: "
                placeholder="Title"
                {
                    ...register("title", {
                        required: true
                    })
                } />
                <Input
                label="Slug: "
                className="mb-4"
                placeholder="Slug"
                {
                    ...register("slug", {
                        required: true
                    })
                }
                onInput={e => {
                    setValue(
                        "slug",
                        slugTransform(e.currentTarget.value),
                        {
                            shouldValidate: true
                        }
                    );
                }} />
                <RTE
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")} />
            </div>
            <div>
                <Input
                className="mb-4"
                label="Fearured Image: "
                placeholder="Featured Image"
                type="file"
                accept="image/png image/jpg image/jpeg image/gif"
                {
                    ...register("image", {
                        required: !post
                    })
                } />
                {
                    post && (
                        <div className="w-full mb-4">
                            <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg" />
                        </div>
                    )
                }
                <Select
                className="mb-4"
                options={[
                    "active",
                    "inactive"
                ]}
                label="Status: "
                {
                    ...register("status", {
                        required: true
                    })
                } />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500" : undefined}
                className="w-full" >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;