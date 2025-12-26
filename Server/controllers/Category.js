const Category = require("../models/Category");

exports.createCategory= async(req,res)=>{
    try{
        const{name,description}= req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        const CategoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

exports.showAllCategories= async(req,res)=>{
    try{
        const allCategory = await Category.find({},
            {name:true,description:true}
        );
        res.status(200).json({
            success:true,
            data:allCategory,
        });
    }
    catch(error){
         return res.status(500).json({
        success:false,
        message:error.message,
    });
    }
};

exports.categoryPageDetails = async(req,res)=>{
    try{
        const {categoryId}= req.body;

        const selectedCategory = await Category.findById(categoryId)
                                       .populate("courses")
                                       .exec();
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            });
    }

    if(selectedCategory.courses.length === 0){
        console.log("No courses found for the selected category.");
        return res.status(404).json({
            success:false,
            message:"NO Courses found for the selected category.",
        });
    }

    const selectedCourses = selectedCategory.courses;

    const categoriesExpectSelected = await Category.find({
        _id:{$ne: categoryId},
    }).populate("courses");

    let differentCourses =[];
    for(const category of categoriesExpectSelected){
        differentCourses.push(...category.courses);
    }

    const allCategories = await Category.find().populate("courses");
    const allCourses = allCategories.flatMap((category)=>category.courses);
    const mostSellingCourses = allCourses
    .sort((a,b) => b.sold - a.sold)
    .slice(0,10);

    res.status(200).json({
        success: true,
        selectedCourses:selectedCourses,
        differentCourses:differentCourses,
        mostSellingCourses:mostSellingCourses,
    });

}
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        });
    }
};

