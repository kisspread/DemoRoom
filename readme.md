# PCG Demo Room

虚幻引擎(UE5.6) DemoRoom的PCG版本，全流程使用PCG构建 
[中文介绍](./readme_zh.md)

Unreal Engine(UE5.6) DemoRoom PCG Version, Full process use PCG to build.

I found this DemoRoom in UE's official ContentSample that can generate different room variations. It uses Blueprint to achieve fine control over the rooms.

Fine control is well-suited for Blueprint scripting, but it requires a lot of Blueprint code. The official DemoRoom was made before PCG, probably around 10 years ago. Now that we have PCG, I wanted to test if PCG can handle this kind of requirement.

Usually, PCG is used as a tool for scattering points randomly across terrain, sampling models, textures, etc. So, most of the time, PCG is treated as a **macro-level tool**.

This is an experimental project to see if PCG can finely control room generation like UE's official DemoRoom. I also want to check if the development and maintenance costs are lower compared to Blueprint scripting, and if it’s more convenient.

Some of my thoughts:
- **Transform Location**: Floating-point calculations here can easily introduce errors, which then carry over into later steps—especially if the starting point isn’t the origin. To eliminate errors, it’s best to start at world coordinates (0,0,0). Then, in the final stage, use Copy Points to duplicate the point cloud and apply Transform Location to move it to the target position.
- **Subdivide Spline**: Its extrusion vector is super picky. If there’s even a tiny error in the transform, like the vector being off by 1cm, it’ll throw an error (if it’s too long) or a warning (if it’s too short). So when setting the extrusion vector length, it’s better to leave a little extra margin.
- Overall, PCG *can* handle fine control, but you need to watch out for these small issues.
- In terms of development efficiency, it really depends on how familiar you are with PCG. PCG offers way better debugging—quick data inspection and visualization—things Blueprint just can’t match.
- As for Editor performance, PCG needs more computing power, while regular Blueprint scripts run faster. But honestly, it’s not really a big issue in practice.


From:
![img.png](./Image/img.webp)

To:

![](./Image/1.webp)

![](./Image/2.webp)

![](./Image/3.webp)

![](./Image/4.webp)

![](./Image/5.webp)

![](./Image/6.webp)

![](./Image/7.webp)


## The two ideas:
- Use Grammar to build symmetric patterns, such as house columns, doors, etc.
  ![img.png](./Image/img2.png)

- place the model positions in the level, generate Packed Level Actor, and then generate PCG Assets
- ![img.png](./Image/img3.png)

## PCG Functions

I have created some PCG functions for this demo, hope it helps you.

![img.png](./Image/img4.png)
