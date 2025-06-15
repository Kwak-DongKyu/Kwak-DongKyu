$(document).ready(() => {
    render_projects('all');
})


let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: null,
            link: 'https://ieeexplore.ieee.org/abstract/document/10224423',
            title: 'WriMouCon: Wrist-Mounted Haptic Controller for Rendering Physical Properties in Virtual Reality',
            demo: false,
            technologies: ['Haptics', 'VR', 'Wearable Device', 'WHC23'],
            description: "Wristed Mounted wearable devices for rendering force feedback on the palm",
            categories: ['international']
        },
        {
            image: null,
            link: 'https://ieeexplore.ieee.org/abstract/document/10536487',
            title: 'Deep-Texture: A Lightweight Wearable Ring for Shape and Texture Rendering in Virtual Reality',
            demo: false,
            technologies: ['Haptics', 'VR', 'Wearable Device', 'VR24'],
            description: "Finger mounted wearable devices for rendering shape/texture feedback",
            categories: ['poster']
        },
        {
            image: null,
            link: 'https://www.dbpia.co.kr/pdf/pdfView.do?nodeId=NODE12041775&googleIPSandBox=false&mark=0&minRead=5&ipRange=false&b2cLoginYN=false&icstClss=010000&isPDFSizeAllowed=true&accessgl=Y&language=ko_KR&hasTopBanner=true',
            title: 'Single-Axis pose estimation model to solve occlusion issue with wearable haptic device using IMU data in VR',
            demo: false,
            technologies: ['Haptics', 'VR', 'Wearable Device', 'KSC24'],
            description: "Estimating users hand position using IMU.",
            categories: ['domestic']
        },

        
    ]

    let projects = [];
    if(slug == 'all') {
        projects = projects_obj.map(project_mapper);
    } 
    else {
        projects = projects_obj.filter(project => project.categories.includes(slug)).map(project_mapper);
    }
    projects_area.hide().html(projects).fadeIn();
}

let project_mapper = project => {
    return `
        <div class="wrapper">
                
            <div class="card radius shadowDepth1">

                ${project.image ? 
                    `<div class="card__image border-tlr-radius">
                        <a href="${project.link}">
                            <img src="${project.image}" alt="image" id="project-image" class="border-tlr-radius">
                        </a>
                    </div>`           
                : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2><a href="${project.link}">${project.title}</a></h2>
        
                        <p class="paragraph-text-normal">${project.description} ${project.demo ? `<a href="${project.demo}">Demo</a>` : ''}</p>
                    </article>

                                
                    <div class="card__meta">
                        ${project.technologies.map(tech =>
                            `<span class="project-technology paragraph-text-normal">${tech}</span>`
                        ).join('')}
                    </div>

                </div>
            </div>
        </div>
    `
}

let selected = (slug) => {
    render_projects(slug);
}
