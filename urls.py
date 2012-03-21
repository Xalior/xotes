from django.conf.urls.defaults import *
from django.conf import settings
from notes.models import Note

notes = Note.objects.all()
theme = '.'

urlpatterns = patterns(
    '',
    # Devel Media Server                  
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT }),

    # Authentication Views
    (r'^accounts/login/$', 'django.contrib.auth.views.login'),
    (r'^accounts/logout/$', 'django.contrib.auth.views.logout'),
    (r'^$', 'django.views.generic.list_detail.object_list',
        dict(queryset=notes, template_name=theme+'/notes/note_list.html')),
    # Actual Note-taking stuff
    (r'^note/(?P<slug>[-\w\ ]+)/$', 'django.views.generic.list_detail.object_detail',
        dict(queryset=notes, slug_field='slug')),
    (r'^slug_available/$', 'notes.views.slug_available'),
    (r'^create/$','notes.views.create_note'),
    (r'^ajax_create/$','notes.views.ajax_create_note'),
    (r'^note/(?P<slug>[-\w\ ]+)/update/$','notes.views.update_note'),
    (r'^note/(?P<slug>[-\w\ ]+)/ajax_update/$','notes.views.ajax_update_note'),
)

